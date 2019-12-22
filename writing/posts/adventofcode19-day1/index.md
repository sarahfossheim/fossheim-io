---
pageTitle: 'Advent Of Code 2019: Day 1 solutions in Python'
categories: ['Python', 'tutorial']
date: '2019-12-01'
title: 'Advent Of Code 2019: Day 1 solutions in Python'
excerpt: "Solutions for the first day of AoC 2019"
---

I've been really excited to work on the [advent of code](https://adventofcode.com/) challenges this year again. If you don't know the concept, it's basically an advent calendar with programming puzzles that gradually get more difficult. Each day has two challenges that are related to each other, and they can be solved using any coding language or software.

While I'm not planning to compete for points in any leaderboard, my goal for this year is to solve as many of the puzzles as possible and explain my solutions for some of the fun ones on here. I'll mainly be using Python.

## Puzzle day 1

In today's puzzle, we get one input file which contains the mass of modules on a space ship. Based on this input, we are supposed to find the total fuel needed to launch the ship based on a formula.

[Read the full problem](https://adventofcode.com/2019/day/1).

### Part 1

I solved part 1 in ~~one~~ two lines of code:

```python
input = np.array([input])
output = np.sum(np.floor(input / 3) - 2)
```

First, we create a numpy array from the input, so we can avoid having to manually loop through each row of the input. 

Then, we divide the array by 3, floored _(rounded down)_ the result, and substracted 2. 

👉 [View my solution on GitHub](https://github.com/sarahfossheim/adventofcode19/blob/master/python/day-01/part1.py).

### Part 2

We found the amount of fuel needed to accommodate for the weight of the modules. However, the fuel also adds weight to the space ship, meaning that we need to add extra fuel to our ship, using the same formula, to make up for the extra weight the fuel added 🤯.

In short, for each module we'll have to keep repearting the same formula until we reach 0. Then, we just need to take the sum and we know the total amount of fuel. 

First, we create an array from the input file that the advent of code website provided. Then, we create a new value for the total fuel, which equals zero for now.

```python
input_array = [...]
total_fuel = 0
```

This time I did decide to go for a for-loop, although I'm looking for a way of simplifying it. 

For each module, we want to calculate the amount of fuel needed _(and the amount of fuel needed for the fuel, and the amount of fuel needed for that fuel, and so on)_ until we reach 0. We can solve this part with a while-loop. 

```python
for module in input_array:
    while True:
        // calculate the amount of fuel needed
        if new_fuel > 0:
            // add the amount of fuel total_fuel
        else:
            break
```

Now the calculation part. This will be similar to the first part, since we're using the same formula:

```python
new_fuel = np.floor(new_fuel / 3) - 2
```

Then the only thing left to do is adding the `new_fuel` to the `total_fuel` if it's a positive number.

```python
for module in input_array:
    new_fuel = mod
    while True:
        new_fuel = np.floor(new_fuel / 3) - 2
        if new_fuel > 0:
            total_fuel += new_fuel
        else:
            break
```

Outside of the for-loop we can now print the `total_fuel`, which is the output for part 2 of the exercise.

👉 [View my solution on GitHub](https://github.com/sarahfossheim/adventofcode19/blob/master/python/day-01/part2.py).

I will try to publish and explain as many of my solutions as possible over the next couple of weeks, if time allows it. You can also keep an eye on my GitHub account for updates.