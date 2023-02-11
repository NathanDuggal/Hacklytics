from midiutil import MIDIFile
from mingus.core import chords
import mingus.core.scales as scales
import numpy as np
import random

NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
OCTAVES = list(range(11))
NOTES_IN_OCTAVE = len(NOTES)

errors = {
    'notes': 'Bad input, please refer this spec-\n'
}



def swap_accidentals(note):
    if note == 'Db':
        return 'C#'
    if note == 'D#':
        return 'Eb'
    if note == 'E#':
        return 'F'
    if note == 'Gb':
        return 'F#'
    if note == 'G#':
        return 'Ab'
    if note == 'A#':
        return 'Bb'
    if note == 'B#':
        return 'C'

    return note


def note_to_number(note: str, octave: int) -> int:
    note = swap_accidentals(note)
    assert note in NOTES, errors['notes']
    assert octave in OCTAVES, errors['notes']

    note = NOTES.index(note)
    note += (NOTES_IN_OCTAVE * octave)

    assert 0 <= note <= 127, errors['notes']

    return note


#scale = scales.diatonic("C")

#add notes to transform
def add(note, key, steps):
    increment = lambda note: note + 1 if note%12 == (key+4)%12 or note%12 == (key+11)%12 else note+2
    #if note is needing half step (2 cases in the scale), only add 1 half step, otherwise add 2 half step

    for i in range(steps):
        note = increment(note)
    return note



def music_maker(motif):
    #beat means duration (quarter, half, whole, etc)
    array_of_note_numbers = [(note_to_number(note, OCTAVES[4]),beat) for note,beat in motif[0:2]] + [(note_to_number(note, OCTAVES[5]),beat) for note,beat in motif[2:4]] #note to number, and add to list. List comprehension
    motif = array_of_note_numbers

    for i in range(20):
        rand = random.randint(1,5) #index of function
        rand_shift = random.randint(1,4)
        rand_direction = random.randint(0,1)
        
        #dictionary of functions (anonymous lambda functions)
        functions = {1: lambda motif, rand_shift, rand_direction: motif, 
                    2: lambda motif, rand_shift, rand_direction:  [(add(e,0,rand_shift) if rand_direction==0 else add(e,0,-rand_shift),beat) for e,beat in motif],
                    3: lambda motif, rand_shift, rand_direction:  list(reversed(motif)), 
                    4: lambda motif, rand_shift, rand_direction:  list(reversed(motif)),
                    5: lambda motif, rand_shift, rand_direction: [motif[2], motif[1], motif[0], motif[1]],
                    6: lambda motif, rand_shift, rand_direction: [motif[2], motif[1], motif[0], motif[1]] }
        
        #rand = index of function from the function dictionary
        array_of_note_numbers = array_of_note_numbers + functions[rand](motif,rand_shift,rand_direction) #parameters to call the function

        start_index = random.randint(0,int((len(array_of_note_numbers)-4)/4)) * 4
        motif = array_of_note_numbers[start_index:start_index+4] #reassigns motif to a random 4 note measure

        if random.random()<0.2: #beat changing 10% of the time
            new_motif = []
            total_beats = 0

            all_notes = [motif]
            for i in range(40):
                all_notes.append(functions[random.randint(1,3)](all_notes[-1],rand_shift,rand_direction))
                #makes empty list of max number of motifs (if everything is a 16th note, we can have 4 sets of 16th notes to fill a 4 beat measure)
                #does so by mangling the last element in all_notes (begins with just having motif), and appending to all_notes

            all_notes = [item for sublist in all_notes for item in sublist] #flattens 2d array (list of motifs) into 1d (list of beats)
            
            note_count = 0
            while total_beats < 2:
                #NOTE: 1/4 is SIXTEENTH NOTE!!!!!

                beat = random.choice([e for e in [1,1/2] if e<=(2-total_beats)]) #choose a type of note. Can choose any note unless it overflows total measure of 4 beats
                beat = 1/2 if beat==0 else beat
                #beat = random.randint(0, int(4 - total_beats)*16)/16 #adds more notes based on how much space is left (4 beats total)
                total_beats += beat
                new_motif.append((all_notes[note_count][0],beat)) #[0] is getting first element of the tuple
                note_count+=1
                print(beat,note_count)
            while total_beats < 3:
                #NOTE: 1/4 is SIXTEENTH NOTE!!!!!

                beat = random.choice([e for e in [1,1/2] if e<=(3-total_beats)]) #choose a type of note. Can choose any note unless it overflows total measure of 4 beats
                beat = 1/2 if beat==0 else beat
                #beat = random.randint(0, int(4 - total_beats)*16)/16 #adds more notes based on how much space is left (4 beats total)
                total_beats += beat
                new_motif.append((all_notes[note_count][0],beat)) #[0] is getting first element of the tuple
                note_count+=1
                print(beat,note_count)

            while total_beats < 4:
                beat = random.choice([e for e in [1,1/2] if e<=(4-total_beats)]) #choose a type of note. Can choose any note unless it overflows total measure of 4 beats
                beat = 1/2 if beat==0 else beat
                #beat = random.randint(0, int(4 - total_beats)*16)/16 #adds more notes based on how much space is left (4 beats total)
                total_beats += beat
                new_motif.append((all_notes[note_count][0],beat)) #[0] is getting first element of the tuple
                note_count+=1
                print(beat,note_count)
            motif = new_motif
        
            #write 1/16 note logic for runs/trills/motifs
        
        
        
    return array_of_note_numbers

array_of_note_numbers = music_maker([("A", 1),("B", 0.5),("F", 0.5),("D", 2), ("E", 2),("D", 0.5),("C", 0.5),("B", 1)])
#rand_duration = random.randint(1, 5)


#array_of_note_numbers = list(range(129))

#quarter -- 1
#half = 2 -- 2
#whole = 4 -- 3
#eighth = 0.5 -- 4
#sixteenth = 0.25 -- 5





track = 0
channel = 0
time = 0  # In beats
duration = 1  # In beats
tempo = 120  # In BPM
volume = 100  # 0-127, as per the MIDI standard

MyMIDI = MIDIFile(1)  # One track, defaults to format 1 (tempo track is created
# automatically)
MyMIDI.addTempo(track, time, tempo)

for i, note in enumerate(array_of_note_numbers):
    pitch,beat = note
    MyMIDI.addNote(track, channel, pitch, time, beat, volume)
    time+=beat

with open("nathan.mid", "wb") as output_file:
    MyMIDI.writeFile(output_file)