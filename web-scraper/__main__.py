from j_scraper import j_scraper


"""
This script will kick off the process to scrape a user specified
number of games from j_archive.
"""


if __name__ == "__main__":

    # Fall 2001 is when point values changed, we will only use games starting from 2002
    j_scraper = j_scraper(1)
    j_scraper.preprocess()
    if j_scraper.episode_year >= 2002:
        j_scraper.process_clues()
    
    print('done')