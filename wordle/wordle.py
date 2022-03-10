import random
import csv
def wordle(word):
    board = ["_"] * len(word)
    guesses = 0
    guessList = [[""], [""], [""], [""], [""], [""]]
    win = False
    remainingletters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

    while win == False and guesses < 6:
        letterslist = list(word)
        while True:
            print(remainingletters)
            guess = input("guess a word: ")
            if len(guess) == 5:
                break
            else:
                print("guesses have to be 5 letters long")

        # handle cases where the letter is there and in the right spot
        for i in range(5):
            if guess[i] in word:
                for j in range(5):
                    if word[j] == guess[i] and i == j and guess[i] in letterslist:
                        board[i] = guess[i].upper()
                        letterslist.remove(guess[i])

        #handle cases where the letter is in the word in the wrong spot
        for k in range(5):
            if guess[k] in word:
                for l in range(5):
                    if word[l] == guess[k] and guess[k] in letterslist and board[k] != guess[k].upper():
                        board[k] = guess[k] + '.'
                        letterslist.remove(guess[k])

        # handle cases where the letter is in the word but no longer in the letters list
        for m in range(5):
            if guess[m] in word:
                for n in range(5):
                    if word[n] == guess[m] and guess[m] not in letterslist and board[m] != guess[m].upper() and board[m] != guess[m] + '.':
                        board[m] = guess[m] + 'x'

        # handle case where the letter isn't in the word
        for o in range(5):
            if guess[o] not in word:
                board[o] = guess[o] + 'x'

        # delete guessed letters from remaining letters
        for i in range(5):
            if guess[i] in remainingletters:
                remainingletters.remove(guess[i])

        # check if the user won
        correct = 0
        for i in range(5):
            if guess[i] == word[i]:
                correct += 1
        # if they won print congrats
        if correct == 5:
            print("Congratulations you win!")
            return
                         
        # copy the current board into the guesslist
        for i in range(5):
            guessList[guesses].append(board[i])

        # print out guesses board
        for i in range(guesses + 1):
            print(" ".join(guessList[i]))

        # increment guesses (6 guesses max!)
        guesses += 1

    print("The word was {}".format(word))
    print("Better luck next time.")

possibleWords = []

with open("wordleWords.txt", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        possibleWords.append(row)

index = random.randint(0, len(possibleWords))
word = possibleWords[index][0]
wordle(word)