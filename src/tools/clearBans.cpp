/**
 * Clear all bans from the database.
 * @author Damien Vesper <ldamienvesper@gmail.com>
 * @name clearBans.cpp
**/

#include <iostream>

#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>

using namespace std;

mongocxx::instance inst{}; // This should be done only once.
mongocxx::client conn {
   mongocxx::uri { "mongodb://localhost:27017//ShareX?retryWrites=true&w=majority" }
};
mongocxx::database db = conn["ShareX"];
