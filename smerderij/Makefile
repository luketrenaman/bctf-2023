CC=gcc
CFLAGS=-I.

all:
	@echo $(FLAG) | sed 's/./& /g'

smith.o: smith.c
	$(CC) -c -o $@ $< $(CFLAGS) -DFLAG='"${FLAG}"'

smith: smith.o
	$(CC) -o $@ smith.o $(CFLAGS)

.PHONY: clean

clean:
	rm smith *.o