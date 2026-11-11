/**
 * Both code series are shown, player and referee.  To run successfully, you will need to separate these into 2 projects, as they cannot run together within the same workspace.
 * 
 * Each player is given a player number, so that code block will need to be updated for each team's MicroBit.  To make each additional player buzzer, use the same blocks and change set PlayerNumber to 1 to 2, 3, and so on.
 * 
 * The Radio set group has been randomly assigned to Group 3, change as needed (make sure all MicroBits are on the same one).
 * 
 * Player Buzzer Button: A - answer attempt
 * 
 * Referee Buzzer Buttons: A - wrong answer, B - correct answer, A+B - round reset
 */
// If they were first to buzz in
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == PlayerNumber) {
        DONOTPASSGO = true
        AnsweringNow = true
        music.play(music.tonePlayable(740, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
})
// A is the answer button
input.onButtonPressed(Button.A, function () {
    if (GameOn) {
        GameOn = false
        radio.sendNumber(PlayerNumber)
    }
})
// Resets round, 
// new question
input.onButtonPressed(Button.AB, function () {
    LastPlayer = 0
    GameOn = true
    radio.sendString("RESET")
    // Ready to go
    basic.showIcon(IconNames.Yes)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "RESET") {
        DONOTPASSGO = false
        AnsweringNow = false
        GameOn = true
        // Indicates buzzer can now answer, is not locked out
        basic.showIcon(IconNames.Yes)
    }
    if (receivedString == "LOCK") {
        GameOn = false
        // Indicates buzzer is locked out
        basic.showIcon(IconNames.No)
    }
    // They did not give the incorrect answer so have a chance to answer this round
    if (receivedString == "REDO") {
        AnsweringNow = false
        if (DONOTPASSGO == false) {
            GameOn = true
            // Indicates buzzer can now answer, is not locked out
            basic.showIcon(IconNames.Yes)
        }
    }
    // Answer deemed correct by Ref
    if (receivedString == "CORRECT") {
        if (AnsweringNow) {
            basic.showLeds(`
                # # # # #
                # # # # #
                . # # # .
                . . # . .
                . # # # .
                `)
            music.play(music.tonePlayable(523, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(659, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(784, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        }
    }
})
// Correct answer given
input.onButtonPressed(Button.B, function () {
    if (LastPlayer > 0) {
        LastPlayer = 0
        GameOn = false
        radio.sendString("CORRECT")
        // confirmation on ref's MicroBit
        basic.showLeds(`
            # # # # #
            # # # # #
            . # # # .
            . . # . .
            . # # # .
            `)
    }
})
// Player Buzzer Code Blocks
let LastPlayer = 0
let AnsweringNow = false
let DONOTPASSGO = false
let GameOn = false
let PlayerNumber = 0
// all microbits need to be set to same radio #
radio.setGroup(3)
// different # for each MicroBit Player Buzzer 1, 2, 3 etc
PlayerNumber = 1
GameOn = false
DONOTPASSGO = false
AnsweringNow = false
basic.showIcon(IconNames.No)
