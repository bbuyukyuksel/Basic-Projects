import win32com.client as wincl
import os
import time


def text2speech(text):
	service = wincl.Dispatch("SAPI.SpVoice")
	service.Speak(text)

if __name__ == '__main__':
	lyric = ["oy","oy","sus","eminem","sus","nedir bu güzellikler","sus","parmağında yüzükler","sus","sus","koynunda bilenzikler"]
	os.system("cls")
	print("\n\tParça 01 Söz Burak, Müzik Burak","\n"*2)
	count = 1
	while True:
		#text = input("Enter Your Text:\n>>")
		print("Tekrar {:0>2}\n".format(count))
		count += 1
		for text in lyric:
			print("Söz:", text)
			if text:
				if text.lower() in "exit":
					exit()
				elif text.lower() in "sus":
					time.sleep(0.5)
					continue
				text2speech(text)
			else:
				continue