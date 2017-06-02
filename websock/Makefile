all: server

%: %.cc
	g++ -Wall -DTISCH_SHARED="" -I../../libtisch/libs/tools/ -L../../libtisch/libs/tools/ -ltools -o $@ $^
