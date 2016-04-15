#Quick start
In the `furious.grpc` directory.

First start service:
```sh
$ cd server/node.mongo/
$ npm install
$ node server.js
```

Second start client：
```sh
$ cd client/node/
$ npm install
$ npm start
```

#Concurrent

First start service:
```sh
$ cd server/node.mongo/
$ pm2 start server.js --name='grpc.server' -i max
```

Second start client：
```sh
$ cd client/node/
$ pm2 start bin/www --name='grpc.client' -i max
```

```sh
$ pm2 list
```
```javascript
┌─────────────┬────┬─────────┬───────┬────────┬─────────┬────────┬──────────────┬──────────┐
│ App name    │ id │ mode    │ pid   │ status │ restart │ uptime │ memory       │ watching │
├─────────────┼────┼─────────┼───────┼────────┼─────────┼────────┼──────────────┼──────────┤
│ grpc.server │ 0  │ cluster │ 17105 │ online │ 0       │ 13m    │ 33.031 MB    │ disabled │
│ grpc.server │ 1  │ cluster │ 17110 │ online │ 0       │ 13m    │ 110.727 MB   │ disabled │
│ grpc.server │ 2  │ cluster │ 17131 │ online │ 0       │ 13m    │ 33.496 MB    │ disabled │
│ grpc.server │ 3  │ cluster │ 17156 │ online │ 0       │ 13m    │ 33.211 MB    │ disabled │
│ grpc.client │ 4  │ cluster │ 17361 │ online │ 0       │ 13m    │ 58.785 MB    │ disabled │
│ grpc.client │ 5  │ cluster │ 17366 │ online │ 0       │ 13m    │ 78.102 MB    │ disabled │
│ grpc.client │ 6  │ cluster │ 17387 │ online │ 0       │ 13m    │ 86.242 MB    │ disabled │
│ grpc.client │ 7  │ cluster │ 17412 │ online │ 0       │ 13m    │ 85.691 MB    │ disabled │
└─────────────┴────┴─────────┴───────┴────────┴─────────┴────────┴──────────────┴──────────┘
```

```sh
$ ab -n 8000 -c 200 http://localhost:3000/users/zeqi
```
```javascript
This is ApacheBench, Version 2.3 <$Revision: 1528965 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 800 requests
Completed 1600 requests
Completed 2400 requests
Completed 3200 requests
Completed 4000 requests
Completed 4800 requests
Completed 5600 requests
Completed 6400 requests
Completed 7200 requests
Completed 8000 requests
Finished 8000 requests


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /users/zeqi
Document Length:        198 bytes

Concurrency Level:      200
Time taken for tests:   12.885 seconds
Complete requests:      8000
Failed requests:        0
Total transferred:      3208000 bytes
HTML transferred:       1584000 bytes
Requests per second:    620.88 [#/sec] (mean)
Time per request:       322.123 [ms] (mean)
Time per request:       1.611 [ms] (mean, across all concurrent requests)
Transfer rate:          243.14 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.5      0      18
Processing:    12  318  32.5    314     452
Waiting:       12  318  32.5    314     452
Total:         30  319  31.7    314     456


Percentage of the requests served within a certain time (ms)
  50%    314
  66%    326
  75%    335
  80%    341
  90%    357
  95%    369
  98%    384
  99%    396
 100%    456 (longest request)
```
