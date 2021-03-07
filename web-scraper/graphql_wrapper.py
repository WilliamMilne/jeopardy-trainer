from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport
from j_scraper import j_scraper, clue_obj

class graphql_wrapper():
    """

    """
    def __init__(self):
        """
        Creates graphql client
        """
        transport = AIOHTTPTransport(url="http://localhost:3000/graphql")
        self.client = Client(transport=transport, fetch_schema_from_transport=True)

    def send_game(self, game: j_scraper):
        """
        Takes in a j_scraper object and sends all relevant data to graphql.
        """
        pass

    def create_clue(self, clue: clue_obj, date: str, game_id: int):
        """
        Sends clue to graphql endpoint
        """
        mutation = gql("""
            mutation addClue($clueInput: NewClueInput!) {
                addClue(clueInput: $clueInput){
                    id
                }
            }
        """)
        params = {
            "clueInput": {
                "category": {
                    "name": clue.category
                },
                "episode": {
                    "name": date,
                    "jArchiveId": game_id
                },
                "point_value": clue.amount,
                "clue": clue.clue,
                "correctResponse": clue.response
            }
        }


        resp = self.client.execute(mutation, variable_values=params)
        print(resp)
