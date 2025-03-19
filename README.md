# Tetris multiplayer web-game

## Overview

A multiplayer Tetris-like game with bots for singleplayer play.

## Setup

First make sure you have an account setup for ngrok, if not create an account
https://dashboard.ngrok.com/login

Then clone the repository using:

    https://gitea.kood.tech/robertpirs/web-game.git

1.  Next Open a terminal
2.  Navigate to the client directory
3.  Run the following command:

        npm i
        npm run build

4.  Now open another terminal and navigate to the server directory

5.  Create a .env file inside the server directory  s
    add the following content inside it:

        PORT=4000
        NGROK=true
        NGROK_AUTHTOKEN=<your-auth-token>

6.  Run the following commands:

        npm i
        npm start

# How to play 🎮

After running npm start you should see a message like this in the terminal:

    Ingress established at: https://bf87-146-255-182-177.ngrok-free.app

Open the website in your browser using the link provided by the terminal.  
Instructions how to create/join a game are listed in the website  
Have fun :)

# Bots

The bots each have a difficulty:  
Easy, Medium or Hard

The difficulty changes the speed at which the bot plays, with Easy being slow and Hard being fast.