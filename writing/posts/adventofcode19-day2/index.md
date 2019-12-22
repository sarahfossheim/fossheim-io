---
template: post.liquid
pageTitle: 'Advent of Code 2019: Day 2 solutions in Python'
date: '2019-12-02'
categories: ['python', 'tutorial']
title: 'Advent Of Code 2019: Day 2 solutions in Python'
excerpt: "Solutions for the second day of AoC 2019"
---

Earlier we solved the [first day](/writing/posts/adventofcode19-day1) of the Advent of Code 2019 challenge. Now, let's take a look at how to solve the second puzzle. 

The problem is pretty straight-forward. We get a list of numbers, that we split up in groups of four. In a sequence of four, the first number refers to which operation we have to perform.

- 1 = addition
- 2 = multiplication
- 99 = substraction

The next two numbers give the position in the array of the two numbers we have to add or multiply with eachother. The fourht number gives the position where the result of the addition or multiplication will be assigned to.

[Read the full problem](https://adventofcode.com/2019/day/2).

## Part 1

We will have to go through the list in blocks of four. There are different ways of doing this, but for this example we'll use a for-loop:

```python
for index in range(0, len(arr), 4):
    # Do the calculations here
```

This will loop through the entire array, increasing the index by 4 with each loop.

Now, we can easily extract the next pieces of information. The operator is always on the first position of the sequence, and the two next items will tell us **the position in the array** of the two numbers we'll use.

```python
operator = arr[index]
numberA = arr[arr[index + 1]]
numberB = arr[arr[index + 2]]
```

Now we can use an if-elif statement to perform the correct calculations, and assign the output to the correct position in the array. 

```python
    if operator == 99:
        return arr[0]
    elif operator == 1:
        arr[arr[index + 3]] = numberA + numberB
    elif operator == 2:
        arr[arr[index + 3]] = numberA * numberB
```

If we run this on the examples provided in the puzzle, it should give us the right answers.

However, we're not completely done with part 1 yet. The puzzle also mentions that we have to `replace position 1 with the value 12 and replace position 2 with the value 2` before running the program. If we include this before our for-loop, our program is finished and will work for the provided input sequence:

```python
arr[1] = 12
arr[2] = 2

for index in range(0, len(arr), 4):
    operator = arr[index]
    numberA = arr[arr[index + 1]]
    numberB = arr[arr[index + 2]]
    if operator == 99:
        return arr[0]
    elif operator == 1:
        arr[arr[index + 3]] = numberA + numberB
    elif operator == 2:
        arr[arr[index + 3]] = numberA * numberB

print("SOLUTION:", arr[0])
```

[See the full solution on GitHub](https://github.com/sarahfossheim/adventofcode19/blob/master/python/day-02/part1.py)

## Part 2

In part 2 we replace the first and second position of the array with two variables between 0 and 99: a noun (for `arr[1]`) and a verb (for `arr[2]`). Our goal is to find the noun and verb combination that would output an array with `19690720` on the first position, and then put them in a simple formula: `100 * noun + verb`.

We can largely re-use the same code as in part 2, and wrap it inside two for-loops to find the noun-verb combination.

To make things more readable, I also moved the code from part 1 in a function:

```python
def process_array(input_arr):
    arr = input_arr[:]
    # Part 1 for-loop
    return arr[0]
```

I also made a shallow copy of the input array. T*his is because we'll be looping over the array a lot (up to `99*99` times), and we want to start each iteration with our original input array, not the modified ones.

The rest is pretty straight-forward. We'll nest two loops, one for the noun and the other one for the verb, assign the noun to `arr[1]` and the verb to `arr[2]` and then call our `process_array` function.

```python
for noun in range(100):
    for verb in range(100):
        input_arr[1] = noun
        input_arr[2] = verb

        output = process_array(input_arr)
```

Then the only thing that's left to do is stop or loop if the output equals `19690720`, and put them inside of our formula.

```python
for noun in range(100):
    for verb in range(100):
        input_arr[1] = noun
        input_arr[2] = verb

        output = process_array(input_arr)

        if output == 19690720:
            print(100 * noun + verb)
            break
```

It's also possible to pass the noun and verb into the processing function, so it can easily be reused for both parts of the exercise.

[See the full solution on GitHub](https://github.com/sarahfossheim/adventofcode19/blob/master/python/day-02/part2.py)

