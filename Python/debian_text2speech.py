#pip install pyttsx3
import pyttsx3
import os
import threading
import time
def init(name='Burak Büyükyüksel', fcolor='00;33', bcolor='01;42'):
    global rows, cols
    os.system('clear')
    
    print('#'*int(cols))
    print('#\033[{}m\033[{}m{:^{width}}\033[00m#'.format(fcolor,bcolor,name,width=int(cols)-2))
    print('#'*int(cols))
def getTerminalScreens():
    global rows, cols, done, ocols
    while done:
        rows, cols = os.popen('stty size', 'r').read().split()
        #print(rows,cols)
        if ocols:
            if cols != ocols:
                init()
        ocols = cols
        time.sleep(1.5)

rows,cols,ocols,done = 10,10,10,True
myThread = threading.Thread(target=getTerminalScreens)
myThread.start()
time.sleep(2)
init()
engine = pyttsx3.init()
voices = engine.getProperty('voices')
rate = engine.getProperty('rate')
newVoiceRate = 175
engine.setProperty('rate', newVoiceRate)
engine.setProperty('voice', 'turkish')  # changes the voice
repeat = 1
said_list = []
record = True

es = '.'*5

poem_ = [
'Şimdi sen kalkıp gidiyorsun.',
'Git',
'Gözlerin durur mu onlar da gidiyorlar.',
'Gitsinler.',
'Oysa ben senin gözlerinsiz edemem bilirsin',
'Oysa Allah bilir bugün iyi uyanmıştık',
'Sevgideydi ilk açılışı gözlerimizin sırf onaydı',
'Bir kuş konmuş parmaklarıma uzun uzun ötmüştü',
'Bir sevişmek gelmiş bir daha gitmemişti',
'Yoktu dünlerde evelsi güni'
]

poem = [
'Değişir rüzgarın yönü,',
'Solar ansızın.. yapraklar;',
'Şaşırır yolunu denizde gemi,',
'Boşuna bir liman arar.',
'Gülüşü bir yabancının,',
'Çalmıştır senden sevdiğini;',
'İçinde biriken zehir,',
'Sadece kendini öldürecektir;',
'Ölümdür yaşanan tek başına',
'Aşk iki kişiliktir.',
'...',
'Bir anı bile kalmamıştır,',
'Geceler.. boyu sev',        
]

while True:
    say = input('Say that: ')
    if '--num' in say:
        # Tekrar Sayısı
        repeat = int(say.split(' ')[1])
        continue
    elif ';' in say:
        # Son kaydı tekrarla
        go_back = say.count(';')
        say = said_list[-go_back]
        record = False
    elif 'cls' in say:
        # Ekranı Temizle
        say = 'Ekranı. Temizliyorum..'
        os.system('clear')
        init()
        record = False
    elif '.said.' == say:
        # Söylenmişleri listele
        print('\n\033[00;43m',end='')
        for i,j in enumerate(said_list):
            print(len(said_list)-i,j)
        print('\033[00m')
        continue 
    elif 'şiir patlat' == say:
        say = ''
        os.system('clear') 
        init(name='Yasemin Hanıma :)', bcolor='01;41')
        for i, j in enumerate(poem):
            say = j + es
            print('{:2}. {}'.format(i,j))
            engine.say(say)
            engine.runAndWait()
        continue
    elif 'ortaya karışık yap' in say:
        repeat = 3
        say = 'İYİ.. GECELER.. ve.. GÜNAYDINLAR..'
        
    if record:
        said_list.append(say)
    for i in range(repeat) :
        engine.say(say)
    engine.runAndWait()
    record = True
    repeat = 1
