from bs4 import BeautifulSoup
import urllib.request

class clue_obj():
    """
    Object to store and validate that all information is there for a given clue.
    """
    
    def __init__(
        self,
        clue: str,
        response: str,
        amount: int,
        category: str,
        round_id: str,
        is_daily_double: bool
    ):
        self.clue = clue
        self.response = response
        self.amount = amount
        self.category = category
        self.round_id = round_id
        self.is_daily_double = is_daily_double

class j_scraper():
    """
    Parses the given j! Archive page and formats it to be sent to a database.
    """

    def __init__(self, game_id: int):
        """
        Holds env variables and defines empty class variables to be populated
        by self.run()
        """
        self.j_archive_game_url = "https://www.j-archive.com/showgame.php?game_id="+str(game_id)
        self.round_one_id = "jeopardy_round"
        self.round_two_id = "double_jeopardy_round"
        self.round_final_id = "final_jeopardy_round"

        self.game_id = game_id
        self.game_soup = None
        self.episode_num = ''
        self.episode_date = ''
        self.episode_year = None
        self.categories = {
            self.round_one_id: [],
            self.round_two_id: []
        }
        self.clues = []

    def preprocess(self):
        """
        Gets the initial information on the episode before processing clues.
        """
        self.get_game_soup()
        title = self.game_soup.h1.text

        self.episode_num = title.split('#')[1].split(' ')[0]
        self.episode_year = int(title[-4:])
        self.episode_date = title.split(' - ')[1]
        
    def process_clues(self):
        """
        Effectively the main function that runs all the scraping for a
        single game.
        """
        # Round one
        round_one_soup = self.game_soup.find(id=self.round_one_id)
        self.get_categories(round_one_soup, self.round_one_id)
        self.parse_round(round_one_soup, self.round_one_id)

        # Round two
        round_two_soup = self.game_soup.find(id=self.round_two_id)
        self.get_categories(round_two_soup, self.round_two_id)
        self.parse_round(round_two_soup, self.round_two_id)

        # Final Jeopardy
        round_final_soup = self.game_soup.find(id=self.round_final_id)
        self.parse_final(round_final_soup, self.round_final_id)

    def get_game_soup(self):
        """
        Pulls j_archive game page and creates beautifulsoup object
        """
        fid=urllib.request.urlopen(self.j_archive_game_url)
        webpage=fid.read().decode('utf-8')
        self.game_soup = BeautifulSoup(webpage, 'html.parser')

    def get_categories(self, round_soup: BeautifulSoup, round_id: str):
        """
        Gets all category names for a given round.
        Populates self.categories[round_id]
        """
        category_td = round_soup.find_all(class_="category_name")
        for td in category_td:
            self.categories[round_id].append(td.text)

    def parse_round(self, round_soup: BeautifulSoup, round_id: str):
        """
        Parsing logic for both regular and double jeopardy.
        """
        all_tr = round_soup.find_all(class_="clue")
        for i, tr in enumerate(all_tr):
            is_daily_double = False
            try:
                clue = tr.find(class_='clue_text').text
            except AttributeError:
                # If they don't finish a category in the game the questions don't appear
                # We continue on to the next box
                continue
            try:
                amount = int(tr.find(class_='clue_value').text[1:])
            except AttributeError:
                # clue_value class is not available for daily doubles
                amount = (i//6+1) * 200 * (2 if 'double' in round_id else 1)
                is_daily_double = True
            response = tr.div.attrs['onmouseover'].split('"correct_response">')[1].split('</em>')[0]
            self.clues.append(clue_obj(
                clue,
                self.parse_response(response),
                amount,
                self.categories[round_id][i%6],
                round_id,
                is_daily_double
            ))
    
    def parse_final(self, round_soup: BeautifulSoup, round_id: str):
        """
        Parses the single clue for final jeopardy.
        """
        category = round_soup.find(class_="category").text.strip()
        clue = round_soup.find(id="clue_FJ").text
        response = round_soup.find(class_="category").div.attrs['onmouseover'].split('correct_response')[1].split('</em>')[0]
        self.clues.append(clue_obj(
            clue=clue,
            response=self.parse_response(response),
            amount=0,
            category=category,
            round_id=round_id,
            is_daily_double=False
        ))
    
    def parse_response(self, response: str):
        """
        Response may have these issues:
        - the <i> tag may be inside the text so we remove this
        - "or" may appear which means there are two possible responses, we only take the first currently
        """
        if '(or ' in response:
            response = response.split('(or ')[0]
        if '<i>' in response:
            response = response.split('<i>')[1].split('</i>')[0]
        return response