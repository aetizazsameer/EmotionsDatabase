#!/usr/bin/env python

#-----------------------------------------------------------------------
# response.py
# Author: Aetizaz Sameer
#-----------------------------------------------------------------------

class Response:

    def __init__(self, id, sessionid, valence_initial, valence_final,
                 valence_delta, arousal_initial, arousal_final,
                 arousal_delta, responsetimestamp):
        self._id = id
        self._sessionid = sessionid
        self._valence_initial = valence_initial
        self._valence_final = valence_final
        self._valence_delta = valence_delta
        self._arousal_initial = arousal_initial
        self._arousal_final = arousal_final
        self._arousal_delta = arousal_delta
        self._responsetimestamp = responsetimestamp

    def get_id(self):
        return self._id

    def get_sessionid(self):
        return self._sessionid

    def get_videoid(self):
        return self._videoid

    def get_valence_initial(self):
        return self._valence_initial

    def get_valence_final(self):
        return self._valence_final

    def get_valence_delta(self):
        return self._valence_delta

    def get_arousal_initial(self):
        return self._arousal_initial

    def get_arousal_final(self):
        return self._arousal_final

    def get_arousal_delta(self):
        return self._arousal_delta

    def get_responsetimestamp(self):
        return self._responsetimestamp

    def to_dict(self):
        return {
            'id': self._id,
            'sessionid': self._sessionid,
            'videoid': self._videoid,
            'valence_initial': self._valence_initial,
            'valence_final': self._valence_final,
            'valence_delta': self._valence_delta,
            'arousal_initial': self._arousal_initial,
            'arousal_final': self._arousal_final,
            'arousal_delta': self._arousal_delta,
            'responsetimestamp': self._responsetimestamp
        }

#-----------------------------------------------------------------------

def _test():
    response = Response(1, 2, 3, 8, 5, 4, 10, 6, '2023-04-14 00:03:54')
    print(response.get_id())
    print(response.get_sessionid())
    print(response.get_valence_initial())
    print(response.get_valence_final())
    print(response.get_valence_delta())
    print(response.get_arousal_initial())
    print(response.get_arousal_final())
    print(response.get_arousal_delta())
    print(response.get_responsetimestamp())
    print(response.to_dict())

if __name__ == '__main__':
    _test()
