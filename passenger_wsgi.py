#!/usr/bin/env python
# encoding: utf-8

# """
# app.py
# 
# Created by Daniel Gasienica on 2010-12-05.
# Copyright (c) 2010 Daniel Gasienica. All rights reserved.
# """
# 
# import web
# 
# urls = (
#     '/(.*)', 'index'
# )
# 
# app = web.application(urls, globals())
# 
# class index:        
#     def GET(self, name):
#         if not name: 
#             name = 'World'
#         return 'Hello, ' + name + '!'
# 
# if __name__ == "__main__":
#     app.run()

def application(environ, start_response):
    write = start_response('200 OK', [('Content-type', 'text/plain')])
    return ["Hello, world!"]
