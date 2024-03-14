#!/usr/bin/python3
"""0x0A. Prime Game"""


def SieveOfEratosthenes(n):
    """returns a list of all prime numbers until n"""
    prime = [True for i in range(n+1)]
    p = 2
    while (p * p <= n):
        if (prime[p]):
            for i in range(p * p, n+1, p):
                prime[i] = False
        p += 1
    arr = []
    for p in range(2, n+1):
        if prime[p]:
            arr.append(p)
    return arr


def isWinner(x, nums):
    """0. Prime Game"""
    res = {'Maria': 0, 'Ben': 0}
    for n in nums:
        if n == 1:
            res['Ben'] += 1
            continue
        primes = SieveOfEratosthenes(n)
        if len(primes) % 2 == 0:
            res['Ben'] += 1
        else:
            res['Maria'] += 1

    if res['Ben'] > res['Maria']:
        return 'Ben'
    elif res['Ben'] < res['Maria']:
        return 'Maria'
    else:
        return None
