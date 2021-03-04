import sys
from j_scraper import j_scraper
from graphql_wrapper import graphql_wrapper
"""
This script will kick off the process to scrape a user specified
number of games from j_archive.

How to run:
python __main__.py <start_game_id> [<end_game_id>]
"""


if __name__ == "__main__":
    start_game_id = int(sys.argv[1])
    end_game_id = start_game_id+1
    if len(sys.argv) == 3:
        end_game_id = int(sys.argv[2])+1
    
    for game_id in range(start_game_id, end_game_id):
        j_scraper_obj = j_scraper(game_id)
        j_scraper_obj.preprocess()
        # Fall 2001 is when point values changed, we will only use games starting from 2002
        if j_scraper_obj.episode_year >= 2002:
            j_scraper_obj.process_clues()
            graphql = graphql_wrapper()
            graphql.create_clue(j_scraper_obj.clues[0])
            print(f'Completed processing for id: {game_id}')
        else:
            print(f'Game id {game_id} is from year: {j_scraper_obj.episode_year}, and will not be processed.')

    print('done')