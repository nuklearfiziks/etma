E-TMA.bot
-------

The kinder, simpler cousin of LIGMA.bot. :smile:

# Setup instructions

## 1. Create bot account somewhere

I like [botsin.space](https://botsin.space) personally

## 2. Create an API token

This is a multi stage step!

i. Go to "Edit Profile" once logged into your bot account

ii. Click the "Developer" link in the sidebar

iii. Click "New Application"

iv. Give it a name, leave everything else the same; click Done to return to the previous screen.

v. Go back to your bot after creating it by clicking its name.

vi. In the new field full of tokens at the top, copy the newly generated big-ass string in the "Your access token" field.

Note, be careful with this token as anyone with it can act as that user!

### 3. Click dis button hurrr vvvv

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### 3a. Sign up for Heroku if you don't have an account

(Don't worry, this bot will fall under one of Heroku's free plans)

### 4. Fill out the form and you're donezo

- *ACCESS_TOKEN* Fill in the one you generated earlier
- *INSTANCE* This is the domain of your *bot's* instance. Defaults to:
    ```
    botsin.space
    ```
- *USERNAME* This is the user whose tweets you want to Markov.
- *POST_EVERY_X_MINUTES* How frequently do you want to post? Defaults to 30.

#### Other env vars you can add:
- *MAX_LENGTH* Maximum number of characters. Defaults to 400.
- *MIN_WORDS* Minimum number of words. Defaults to 10.
- *MIN_SCORE* Minimum score. *Shrug?* Defaults to 25.
