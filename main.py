words = []

fileName = "words.txt"  # Replace this dynamically with the uploaded file's name

with open(fileName, "r") as file:
    for line in file:
        words.extend(word.strip() for word in line.split(","))  # Strip spaces from each word

words.sort()

# Create the new file name
sortedFileName = f"{fileName.rsplit('.', 1)[0]}_sorted.txt"

# Write sorted words to the new file in a single line, separated by commas
with open(sortedFileName, "w") as sortedFile:
    sortedFile.write(", ".join(words))  # Ensure a space after each comma for readability

print(f"Sorted words saved to {sortedFileName}")
