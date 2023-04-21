#!/usr/bin/env python

# -----------------------------------------------------------------------
# response_avg.py
# Author: Aetizaz Sameer
# -----------------------------------------------------------------------

class ResponseAvg:

    def __init__(self, videoid, videotitle, valence_initial,
                 valence_final, valence_delta, arousal_initial,
                 arousal_final, arousal_delta):
        self._videoid = videoid
        self._videotitle = videotitle
        self._valence_initial = valence_initial
        self._valence_final = valence_final
        self._valence_delta = valence_delta
        self._arousal_initial = arousal_initial
        self._arousal_final = arousal_final
        self._arousal_delta = arousal_delta

    def get_videoid(self):
        return self._videoid

    def get_videotitle(self):
        return self._videotitle

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

    def to_dict(self):
        return {
            'videoid': self._videoid,
            'videotitle': self._videotitle,
            'valence_initial': self._valence_initial,
            'valence_final': self._valence_final,
            'valence_delta': self._valence_delta,
            'arousal_initial': self._arousal_initial,
            'arousal_final': self._arousal_final,
            'arousal_delta': self._arousal_delta,
        }

# -----------------------------------------------------------------------


def _test():
    response = ResponseAvg(1, "title", 3.5, 4.2, 0.7, 2.1, 2.9, 0.8)

    print(response.get_videoid())         # Output: 1
    print(response.get_videotitle())      # Output: title
    print(response.get_valence_initial())  # Output: 3.5
    print(response.get_valence_final())   # Output: 4.2
    print(response.get_valence_delta())   # Output: 0.7
    print(response.get_arousal_initial())  # Output: 2.1
    print(response.get_arousal_final())   # Output: 2.9
    print(response.get_arousal_delta())   # Output: 0.8


if __name__ == '__main__':
    _test()
