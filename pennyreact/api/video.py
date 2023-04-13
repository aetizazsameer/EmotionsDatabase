#!/usr/bin/env python

#-----------------------------------------------------------------------
# video.py
# Author: Aetizaz Sameer
#-----------------------------------------------------------------------

class Video:

    def __init__(self, id, title, url, uploadtimestamp):
        self._id = id
        self._title = title
        self._url = url
        self._uploadtimestamp = uploadtimestamp

    def get_id(self):
        return self._id

    def get_title(self):
        return self._title

    def get_url(self):
        return self._url

    def get_uploadtimestamp(self):
        return self._uploadtimestamp

    def to_tuple(self):
        return (self._id, self._title, self._url, self._uploadtimestamp)

    def to_dict(self):
        return {
            'id': self._id,
            'title': self._title,
            'url': self._url,
            'uploadtimestamp': self._uploadtimestamp
        }

#-----------------------------------------------------------------------

def _test():
    video = Video('Vancouver City Highlight',
                 'https://mediacentral.princeton.edu/media/' +
                 'Walk%20in%20the%20City%20(Neutral)/1_evlgwt6z',
                 '2023-03-30 21:33:56')
    print(video.get_id())
    print(video.get_title())
    print(video.get_url())
    print(video.get_uploadtimestamp())
    print(video.to_tuple())

if __name__ == '__main__':
    _test()
