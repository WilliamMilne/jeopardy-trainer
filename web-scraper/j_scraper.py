from bs4 import BeautifulSoup

class j_scraper():
    """
    Parses the given j! Archive page and sends all questions to be stored in the database.
    """

    def __init__(self):
        """

        """
        pass
        
    def get_categories(self, j_round):
        """

        """
        all_td = j_round.find_all(class_="category")
        categories_html = []
        for td in all_td:
            try:
                categories_html.append(td.td.text)
            except AttributeError:
                pass
        return categories_html


    def parse_round(self):
        """

        """
        pass