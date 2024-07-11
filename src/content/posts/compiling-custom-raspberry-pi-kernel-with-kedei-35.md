---
author: Filip Rec
publishedAt: 2015-01-01T00:00:00Z
exactPublishedAtUnknown: true
title: Compiling custom Raspberry Pi kernel with KeDei 3.5" touchscreen V2 drivers
slug: compiling-custom-raspberry-pi-kernel-with-kedei-35
recent: true
draft: false
tags:
  - electronics
---

I wanted to save a couple of bucks on a Raspberry Pi touchscreen, so I ordered one off aliexpress, thinking it would be a Waveshare knock-off, compatible with their drivers, fbtft or something. I was hoping for an easy set up, but that certainly was not the case. What I received was a **KeDei 3.5 inch SPI TFT LCD, version 2**. If you have one as well, you already probably know there's a difference between V1 and V2. If you don't, there's not much for you to read here.

Anyway, after spending two days trying to get this thing to work I can finally share what I managed to figure out by research and a lot of trial and error. The seller provides a package with "drivers". What they really are is just an old, custom kernel and two files to turn the screen on and off. However, this replaces the framebuffer, which means HDMI output is overridden and you need to restart your Pi every time you want to switch the console/X between LCD and HDMI. But most importantly: **using those files replaces your kernel with a 3.18.x version**. This is far from ideal, I need 4.x.x because of native support for my Wi-Fi dongle. Besides, it supposedly blocks any unused GPIO pins. To be honest, you can just give up on trying to download any files from your seller (mine provided a SCREENSHOT of a URL, a google drive one with a really long hash in it, can you believe that). Luckily, there's a diff file from the manufacturer.

Before you read on, I strongly suggest you to [read this post](http://heikki.virekunnas.fi/2015/raspberry-pi-tft/) (by Heikki Virekunnas) as well. The author found himself in a similar situation, however his screen is version 1, which means his package will not work for you, but might shed some light on what we're doing here.

I've decided to try and compile my own kernel, from the latest release source files. This is your best shot if you want a working KeDei screen with a newer kernel. I've never done that, but it turned out to be fairly simple following the link above as well as some aid from Google Search and the [official guide on building your custom kernel](https://www.raspberrypi.org/documentation/linux/kernel/building.md). After downloading the Linux source files from github, you're gonna have to patch it, paste a driver file into an appropriate directory, and create a config file. I've uploaded all the necessary files to [this repo](https://github.com/zefj/kedei2-patchfiles). You can hopefully figure out appropriate paths, all the directories and filenames are just as they are in the source files.

A quick explanation:

- The official diff file is broken as hell, won't work because it misses some differences, and is built from comparing to an old kernel version, which means a lot of confusion if you try to patch it manually. If your linux source files match the release I used ([commit](https://github.com/raspberrypi/linux/commit/853eff4e9b369cdc20be7c538bc5a5291eeab31d)), either use my patch file, or just directly copy-paste the files. If not, you can try to use the one Heikki provided in his post, it should work as well. If neither goes through, with little work you can figure out what needs to be added or commented out, and modify the code on your own.
- `.config` file is from Heikki, I ran it through make oldconfig and turned the ili9341 driver on afterwards
- the `ili9341.c` driver is from the patch file supplied by the seller. There are two versions of this driver floating around the Internet, only the one in my repo works for V2 displays (and I also patched some errors, so you probably want to use that one)

This is what happens if you follow Heikki's TL;DR or compile the kernel with V1 drivers on a V2 screen (hint: the colours are inverted):

![There used to be an image here, but I lost it. Sorry!](/media/uploads/2015/12/25/rpiinve.jpg)

So, after 7 or 8 tries, it finally worked. By trial and error I was able to figure out the appropriate combination. I've used Heikki's diff file, and the ili9341.c file from the "official" patch. I ran the .config through make oldconfig, manually made sure the ili9341 driver is turned on, and then compiled according to the guide. Cross compiling is the way to go, I used VirtualBox with Ubuntu 14.04 on it, and used raspberrypi/linux repo [commit](https://github.com/raspberrypi/linux/commit/853eff4e9b369cdc20be7c538bc5a5291eeab31d). You can surely figure out any missing dependencies.

After compiling and flashing it to your sd card, make sure to add `ili9341` and `fb_ili9341` to your `/etc/modules`. Doing that, ls /dev/ should report `/dev/fb0` (which would be your HDMI framebuffer), and `/dev/fb1` (the LCD). If that is the case, you can use the con2fbmap 1 1 and con2fbmap 1 0 commands in headless mode to change between them. If you want to boot X to your LCD, go to `/usr/share/X11/xorg.conf/99-fbturbo.conf` and change `fb0` to `fb1`.

And that should do it. You can now enjoy the latest kernel with support for your new cheap touchscreen.

![There used to be an image here, but I lost it. Sorry!](/media/uploads/2015/12/25/rpinorm.jpg)

---

# TL;DR:

There's a (hopefully complete) list of steps:

1.  Clone repos

```bash
cd /home/user/
git clone https://github.com/raspberrypi/tools
export CCPREFIX=/home/user/tools/arm-bcm2708/gcc-linaro-arm-linux-gnueabihf-raspbian/bin/arm-linux-gnueabihf-
git clone --depth=1 https://github.com/raspberrypi/linux
git clone https://github.com/zefj/kedei2-patchfiles
```

Make sure your variable works fine by running `{'${CCPREFIX}'}gcc -v`, if the returned wall of text is different than `gcc -v`, and there don't seem to be any errors, you're fine.

2.  Patch source files

```bash
cd linux/
cat /home/user/kedei2-patchfiles/kedei-diff.patch | patch -p1
cp /home/user/kedei2-patchfiles/drivers/video/fbdev/ili9341.c drivers/video/fbdev/ili9341.c
cp /home/user/kedei2-patchfiles/.config .config
```

OR

```bash
cp -r kedei2-patchfiles/. linux/
```

OR

Use the patch from http://heikki.virekunnas.fi/wp-content/uploads/sites/2/2015/08/ili9341_patch.diff, and the `ili9341.c` driver and `.config` from my repo.

Make sure every file is patched! Changes to `bcm2708.c`, `bcm2709.c`, `Kconfig` and `Makefile` in directories as in my repo. You also need `ili9341.c` present.

3.  Create config file

```bash
cd linux/
make ARCH=arm CROSS_COMPILE=\${CCPREFIX} oldconfig
```

This will take the config file and run it against the kernel to check for any missing options. You need to edit it manually after it returns to make sure `CONFIG_FB_ILI9341` is set to `m`. Just search for it, remember to delete the leading hash if there is one.

4.  Compile!

```bash
​make ARCH=arm CROSS_COMPILE=\${CCPREFIX} zImage modules dtbs
```

5.  Move the files to your Raspberry Pi SD card according to the 'install directly onto the sd card' section in the official kernel building guide.
