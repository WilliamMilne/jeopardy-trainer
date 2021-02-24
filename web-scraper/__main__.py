from bs4 import BeautifulSoup
from j_scraper import j_scraper
import urllib.request

j_archive_game_url = "https://www.j-archive.com/showgame.php?game_id="

if __name__ == "__main__":

    # Get HTML from j-archive
    fid=urllib.request.urlopen(j_archive_game_url + '1')
    webpage=fid.read().decode('utf-8')
    
    soup = BeautifulSoup(webpage, 'html.parser')
    j_scraper = j_scraper()
    j_scraper.get_categories(soup.find(id="jeopardy_round"))
    print('done')