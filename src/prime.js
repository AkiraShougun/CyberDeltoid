export function nthPrime(n) {
  let limit = 225000;
  let primes = [];
  let sieve = new Array(limit).fill(true);
  sieve[0] = sieve[1] = false;

  for (let i = 2; i < limit; i++) {
    if (sieve[i]) {
      primes.push(i);
      for (let j = i * i; j < limit; j += i) {
        sieve[j] = false;
      }
    }
  }

  return primes[n - 1];
}
