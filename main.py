words = []

with open("words.txt", "r") as file:
    for line in file:
        words.extend(line.split()) 

words.sort()  
print(words)
