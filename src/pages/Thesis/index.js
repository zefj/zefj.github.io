import React, { Component } from 'react';

import View from '../../components/View';

class Thesis extends Component {
  render() {
    return (
      <View className="thesis">


<p>I've graduated from the Westpomeranian University of Technology in Szczecin, Poland. This means I'm now officially an engineer. The automated guitar tuning system was built for my thesis, you can read the <a href="http://frec.pl/bscthesis.txt">abstract here</a>.</p>

<p>The tuner is a prototype, it was intended to be a proof-of-concept. It is not&nbsp;ideal, which is why I will not be doing any tutorials, or DIY posts. I consider this project over, it made me an engineer and I think it's time to move on :)&nbsp;</p>

<p>It was a pain to tune the PID regulator, because the guitar keys are not consistent which makes the entire system really difficult to control. That being said, most of the times the whole process ends within seconds, which is a really good result, considering the architecture. What I mean by that is that&nbsp;Linux is not suitable for real time applications. It does alright, but does not shine. The frequency detection method works fine, the tuning algorithm too, but servo control on Raspberry Pi is far from&nbsp;effective. This causes the servo to sometimes refuse&nbsp;to start, but other than that I am really happy with the&nbsp;AR-3606HB and Raspberry Pi combo, it turned out to be far more forgiving to inconsistent pulses - some other servos I tested would not work with the Pi at all!&nbsp;</p>

<p>The KeDei touchscreen I had so much trouble with was obviously needed for the GUI. I managed to get it working, and with some hacks in the code it works quite well.</p>

<p>In the end, I've decided to let go of multiprocessing, and opted for multithreading just for the non-blocking GUI. The algorithms no longer run parallel, because it made that much more mess and didn't really improve anything. If my timings are correct, one loop takes about 40 ms, which considering the servo update frequency of 50 Hz could very well be almost exactly two pulses per loop. This might be a good talking point, but I have not checked how the RPI.GPIO library works or studied how the&nbsp;Pi handles pulses generation and code execution, so I wouldn't know if this actually is as significant as it sounds to me. Definitely a lot more to learn in this field, and I've already got some projects with servos in mind, so this will eventually happen ;)</p>

<p>Anyway, check the short video below to see how it works.</p>

<p><iframe title="youtube" frameBorder="0" height="315" scrolling="no" src="https://www.youtube.com/embed/UIllShJdyeE" style={{ maxWidth: "100%" }} width="100%"></iframe></p>

<p>As always, you can see the <a href="https://github.com/zefj/guitar-tuning-system">code on Github</a>. The touchscreen and framebuffer issues made me&nbsp;seriously consider just&nbsp;building a GUI in Flask, HTML and CSS, and displaying a webpage on the screen. Having sorted that out, PyGame was my only option since it allows rendering stuff directly to the framebuffer (which means starting the app from the console without having to start X Server).&nbsp;Due to lack of references on how to properly structure everything PyGame&nbsp;GUI code (and Tkinter before)&nbsp;always somehow turns out to be a big mess. So don't look into gui.py, I've never used the libraries before, I was in a hurry and it's a mess.</p>

<p>This project is a big personal success, it proved that with enough determination you can gain knowledge and understanding in any field you want. It was fun to develop, less fun to write 70 pages about, but in the end the committee rated it highly and I received the highest possible grades, both for the thesis and defense.</p>

<p>So yeah, I'm an engineer :)</p>

      </View>
    );
  }
}

export default Thesis;
