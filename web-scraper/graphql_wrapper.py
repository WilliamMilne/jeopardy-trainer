from python_graphql_client import GraphqlClient
from j_scraper import j_scraper, clue_obj

class graphql_wrapper():
    """

    """
    def __init__():
        """
        Creates graphql client
        """
        self.client = GraphqlClient(endpoint="http://localhost:3000/graphql")

    def send_game(self, game: j_scraper):
        """
        Takes in a j_scraper object and sends all relevant data to graphql.
        """
        pass

    def create_clue(self, clue: clue_obj):
        """
        Sends clue to graphql endpoint
        """
        mutation = """
            mutation {
                addClue(clueInput: {
                    category: {
                        name: $category
                    },
                    episode: {
                        name: $date
                        jArchiveId: $game_id
                    },
                    point_value: $amount,
                    clue: $clue,
                    correctResponse: $response
                })
            }
        """
        variables = {
            "category": clue_obj.category,
            "date:": clue_obj.episode_date,
            "game_id": clue_obj.game_id,
            "amount": clue_obj.amount,
            "clue": clue_obj.clue,
            "response": clue_obj.response
        }

        resp = client.execute(mutation=mutation, variables=variables)
        print(resp)


    