import sys
from j_scraper import j_scraper
"""
This script will kick off the process to scrape a user specified
number of games from j_archive.

How to run:
python __main__.py <start_game_id> [<end_game_id>]
"""


if __name__ == "__main__":
    start_game_id = sys.argv[1]
    end_game_id = start_game_id+1
    if len(sys.argv) == 3:
        end_game_id = sys.argv[2]
    
    for game_id in range(start_game_id, end_game_id):
        j_scraper = j_scraper(id)
        j_scraper.preprocess()
        # Fall 2001 is when point values changed, we will only use games starting from 2002
        if j_scraper.episode_year >= 2002:
            j_scraper.process_clues()

    print('done')