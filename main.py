def on_received_number(receivedNumber):
    global GameOn
    if GameOn:
        GameOn = False
        basic.show_number(receivedNumber)
        music.play(music.tone_playable(523, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    global GameOn
    if GameOn:
        GameOn = False
        basic.show_string("A")
        music.play(music.tone_playable(523, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global GameOn
    GameOn = True
    basic.show_string("Go!")
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global GameOn
    GameOn = True
    basic.show_string("Go!")
input.on_button_pressed(Button.B, on_button_pressed_b)

# Player Code
GameOn = False
# all microbits need to be set to same radio #
radio.set_group(3)
GameOn = True
# different for each microbit, Player 1, 2, 3 etc
PlayerNumber = 1
basic.show_string("Go!")