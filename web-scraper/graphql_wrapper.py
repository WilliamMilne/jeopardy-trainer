from python_graphql_client import GraphqlClient
from j_scraper import j_scraper, clue_obj

class graphql_wrapper():
    """

    """
    def __init__(self):
        """
        Creates graphql client
        """
        self.client = GraphqlClient(endpoint="http://localhost:3000/graphql")

    def send_game(self, game: j_scraper):
        """
        Takes in a j_scraper object and sends all relevant data to graphql.
        """
        pass

    def create_clue(self, clue: clue_obj, date: str, game_id: int):
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
            "category": clue.category,
            "date:": date,
            "game_id": game_id,
            "amount": clue.amount,
            "clue": clue.clue,
            "response": clue.response
        }

        resp = self.client.execute(query=mutation, variables=variables)
        print(resp)
