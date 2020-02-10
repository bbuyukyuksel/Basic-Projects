def main():
	brut = lambda a,f,g : (a*f*g) / 36500
	stopaj = lambda x : x * 15 / 100
	
	a = float(input("Ana Para:"))
	f = float(input('Yıllık Faiz:'))
	g = float(input('Gün:'))
	
	b = brut(a,f,g)
	s = stopaj(b)
	
	
	print("{:10}:{:>5.2f}".format("Brüt",b))
	print("{:10}:{:>5.2f}".format("Stopaj",s))
	print("-", '_'*15)
	
	print("{:10}:{:>5.2f}".format('Net',b-s))
	
if __name__ == '__main__':
	main()