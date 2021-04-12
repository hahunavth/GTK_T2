#GTK
project(gtk_tutorial LANGUAGES C)

cmake_minimum_required(VERSION 2.8.12)

find_package(PkgConfig REQUIRED)
pkg_check_modules(GTK3 REQUIRED gtk+-3.0)

include_directories(${GTK3_INCLUDE_DIRS})
link_directories(${GTK3_LIBRARY_DIRS})

add_definitions(${GTK3_CFLAGS_OTHER} -rdynamic)

message(STATUS "Include: ${GTK3_INCLUDE_DIRS}\n LIB_DIR: ${GTK3_LIBRARY_DIRS} \n CFLAGS_OTHERS: ${GTK3_CFLAGS_OTHER} \n LIBS: ${GTK3_LIBRARIES}")

#db
add_subdirectory(db)

set(DB db/student-db.c)

#exec
add_executable(listview list_view_main.c ${DB})
target_link_libraries(listview ${GTK3_LIBRARIES})
target_link_libraries(listview sqlite3 pthread dl)

