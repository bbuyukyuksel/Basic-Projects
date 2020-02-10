import os
import time
while True:
    time.sleep(0.5)
    out = os.system("ps -eo pid,comm,lstart,etime,time,args | grep 9778 | cut -d' ' -f1-27")
    #print(out)
    if 'python' not in str(out):
        break
    print(out)

