---
author: Filip Rec
pubDatetime: 2016-01-01T00:00:00Z
exactPublishedAtUnknown: true
title: Automated guitar tuning system
slug: automated-guitar-tuning-system
featured: true
draft: false
tags:
  - electronics
description: Automated guitar tuning system
---

I've graduated from the Westpomeranian University of Technology in Szczecin, Poland. This means I'm now officially an engineer. The automated guitar tuning system was built for my thesis, you can read the abstract below:

> HARDWARE AND SOFTWARE SYNTHESIS OF A STRINGED INSTRUMENTS TUNING SYSTEM
> Engineer's thesis, Filip Rec, 2016
>
> Abstract
>
> Keeping a guitar in tune proves to be problematic for novice musicians around the world. A wide variety of electronic devices that indicate pitch is available on the market, however, properly using those implies certain knowledge of music theory, such as guitar tunings, and pitches that belong to them. The purpose of this research was to develop a prototype of an automated guitar tuning system, that would aid the user in this activity by estimating the pitch and rotating the guitar key appropriately. Using the Raspberry Pi and an algorithm with the autocorrelation method, it was possible to track the pitch of a captured audio sample with high precision. To achieve the goal, it was necessary for the frequency measurement to be conducted in near real-time, which required the instrument to be plugged into a sound card to allow constant data stream. Several tests confirmed that Raspberry Pi with Linux operating system handles simultaneous measurements and pulse-width modulation relatively well. Joined by a continuous rotation servomechanism and a PID regulator, the system is able to tune any string to the set point in a matter of seconds. In addition, the prototype was equipped with a touchscreen with graphical user interface, that allows easy control over the process and its basic settings, and guides the user by displaying notifications. Conducted tests confirmed that high accuracy and tuning speed were achieved no matter the instrument quality, and that any potential tuning error is mostly unnoticeable by an average guitarist.

The tuner is a prototype, it was intended to be a proof-of-concept. It is not ideal, which is why I will not be doing any tutorials, or DIY posts. I consider this project over, it made me an engineer and I think it's time to move on :)

It was a pain to tune the PID regulator, because the guitar keys are not consistent which makes the entire system really difficult to control. That being said, most of the times the whole process ends within seconds, which is a really good result, considering the architecture. What I mean by that is that Linux is not suitable for real time applications. It does alright, but does not shine. The frequency detection method works fine, the tuning algorithm too, but servo control on Raspberry Pi is far from effective. This causes the servo to sometimes refuse to start, but other than that I am really happy with the AR-3606HB and Raspberry Pi combo, it turned out to be far more forgiving to inconsistent pulses - some other servos I tested would not work with the Pi at all!

The KeDei touchscreen I had so much trouble with was obviously needed for the GUI. I managed to get it working, and with some hacks in the code it works quite well.

In the end, I've decided to let go of multiprocessing, and opted for multithreading just for the non-blocking GUI. The algorithms no longer run parallel, because it made that much more mess and didn't really improve anything. If my timings are correct, one loop takes about 40 ms, which considering the servo update frequency of 50 Hz could very well be almost exactly two pulses per loop. This might be a good talking point, but I have not checked how the RPI.GPIO library works or studied how the Pi handles pulses generation and code execution, so I wouldn't know if this actually is as significant as it sounds to me. Definitely a lot more to learn in this field, and I've already got some projects with servos in mind, so this will eventually happen ;)

Anyway, check the short video below to see how it works.

<iframe src="https://www.youtube.com/embed/UIllShJdyeE" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

As always, you can see the [code on Github](https://github.com/zefj/guitar-tuning-system). The touchscreen and framebuffer issues made me seriously consider just building a GUI in Flask, HTML and CSS, and displaying a webpage on the screen. Having sorted that out, PyGame was my only option since it allows rendering stuff directly to the framebuffer (which means starting the app from the console without having to start X Server). Due to lack of references on how to properly structure everything PyGame GUI code (and Tkinter before) always somehow turns out to be a big mess. So don't look into gui.py, I've never used the libraries before, I was in a hurry and it's a mess.

This project is a big personal success, it proved that with enough determination you can gain knowledge and understanding in any field you want. It was fun to develop, less fun to write 70 pages about, but in the end the committee rated it highly and I received the highest possible grades, both for the thesis and defense.

So yeah, I'm an engineer :)
