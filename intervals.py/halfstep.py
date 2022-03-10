masterList = ['A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab']
sharpList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
flatList = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']
intervals = ['unison', 'minor second', 'major second', 'minor third',
            'major third', 'perfect fourth', 'tritone', 'perfect-fifth', 'minor sixth', 'major sixth'
            'minor seventh', 'major seventh']

note1 = None
note2 = None
note1Index = None
note2Index = None
direction = None
distance = 0

referenceList = []
# this is a lsit that begins on the first note
note1List = []

def getNotes():
    global note1
    global note2
    global referenceList
    while True:
        note1 = input("Starting note: ")
        note2 = input("Destination note: ")
        note1 = note1[0].upper()
        note2 = note2[0].upper()
        if note1 in masterList and note2 in masterList:
            if note1 in sharpList and note2 in sharpList:
                referenceList = sharpList
                break
            elif note1 in flatList and note2 in flatList:
                referenceList = flatList
                break
            else:
                print("please do not mix sharps and flats")
        else:
            print("Please input two valid notes")

def getDirection():
    global direction
    while True:
        direction = input("Direction? (up/down): ")
        direction = direction.upper()
        if 'UP' in direction or 'DOWN' in direction:
            break
        else:
            print("please type 'up' or 'down'")
        
def getIndex(note1, note2, list):
    global note1Index
    global note2Index
    note1Index = list.index(note1)
    note2Index = list.index(note2)

def getNewList(note1Index, list):
    global note1List
    if 'UP' in direction:
        for i in range(note1Index, len(list)):
            note1List.append(list[i])
        for i in range(note1Index):
            note1List.append(list[i])
    else:
        for i in range(note1Index, -1, -1):
            note1List.append(list[i])
        for i in range(len(list) - 1, note1Index, -1):
            note1List.append(list[i])
 

#get the notes from the user
getNotes()
# get the direction in which we should be calculating
getDirection()
#get the index of those notes in the relavent list
getIndex(note1, note2, referenceList)
# make a new list starting from note 1
getNewList(note1Index, referenceList)

#now find the distance from note 1 to note 2
for i in range(len(note1List)):
    if note1List[i] == note2:
        print("The distance between the notes is " + str(distance) + " halfsteps!")
        break
    else:
        distance += 1

if distance == 0:
    print('this note relationship is unison')
else:
    print("The relationship between these notes is a " + intervals[distance] + " " + direction.lower() + "!")
