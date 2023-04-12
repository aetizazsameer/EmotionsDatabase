#!/usr/bin/env python

# -----------------------------------------------------------------------
# video_selector.py
# Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
# -----------------------------------------------------------------------

from database import get_videos
import random


def selector():
    videos = get_videos('')
    n = len(videos)
    randomIndex = random.randint(0, n-1)
    return videos[randomIndex].get_url()

# -----------------------------------------------------------------------


def _test():
    print("Random URL: ", selector())


if __name__ == '__main__':
    _test()
