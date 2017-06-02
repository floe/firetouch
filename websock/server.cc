#include <fstream>
#include <iostream>
#include <WebSocket.h>
#include <Thread.h>

WebSocket sock( INADDR_ANY, 8080 );

int main() {

	while (1) {

		std::cout << "listening.." << std::endl;
		WebSocket* conn = sock.listen();
		std::cout << "connected." << std::endl;

		while (*conn) {

			std::cout << "receiving..." << std::endl;
			std::string item;
			std::getline(*conn,item);
			std::cout << "got: " << item << std::endl;

			*conn << item << std::flush;
			std::cout << "sent: " << item << std::endl;
		}

		conn->close();
		delete conn;
	}
}

