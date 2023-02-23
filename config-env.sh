#!/bin/bash

# Copy environment variables from .env.example files to .env files

# auth_service
cp ./backend/auth_service/.env.example ./backend/auth_service/.env
# data_service
cp ./backend/data_service/.env.example ./backend/data_service/.env
# display_service
cp ./backend/display_service/.env.example ./backend/display_service/.env
# frontend
cp ./frontend/.env.example ./frontend/.env