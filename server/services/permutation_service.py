import math
from core.exceptions import InvalidNException

class PermutationService:

    def validate_n(self, n: int) -> None:
        if n < 1 or n > 20:
            raise InvalidNException()

    def total_permutations(self, n: int) -> int:
        self.validate_n(n)
        return math.factorial(n)

    def get_permutation(self, n: int, index: int) -> list[int]:
        self.validate_n(n)

        nums = list(range(1, n + 1))
        result = []

        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i

        k = index

        for i in range(n - 1, -1, -1):
            block = fact[i]
            pos = k // block
            k %= block
            result.append(nums.pop(pos))

        return result