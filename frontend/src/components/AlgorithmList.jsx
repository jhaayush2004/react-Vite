import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from 'lucide-react';

export const sortingAlgorithms = [
  {
    name: "Bubble Sort",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    pseudocode: "for i from 1 to N\n    for j from 0 to N-i\n        if a[j] > a[j+1]\n            swap a[j] and a[j+1]",
    testCases: "Input: [64, 34, 25, 12, 22, 11, 90]\nOutput: [11, 12, 22, 25, 34, 64, 90]"
  },
  {
    name: "Selection Sort",
    description: "Divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    pseudocode: "for i from 0 to N-1\n    min = i\n    for j from i+1 to N\n        if a[j] < a[min]\n            min = j\n    swap a[i] and a[min]",
    testCases: "Input: [64, 25, 12, 22, 11]\nOutput: [11, 12, 22, 25, 64]"
  },
  {
    name: "Insertion Sort",
    description: "Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    pseudocode: "for i from 1 to N\n    key = a[i]\n    j = i - 1\n    while j >= 0 and a[j] > key\n        a[j+1] = a[j]\n        j = j - 1\n    a[j+1] = key",
    testCases: "Input: [12, 11, 13, 5, 6]\nOutput: [5, 6, 11, 12, 13]"
  },
  {
    name: "Merge Sort",
    description: "An efficient, stable, divide-and-conquer algorithm. Conceptually, it works as follows: Divide the unsorted list into n sublists, each containing one element, then repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    pseudocode: "mergeSort(arr, l, r):\n    if l < r\n        m = (l+r)/2\n        mergeSort(arr, l, m)\n        mergeSort(arr, m+1, r)\n        merge(arr, l, m, r)",
    testCases: "Input: [38, 27, 43, 3, 9, 82, 10]\nOutput: [3, 9, 10, 27, 38, 43, 82]"
  },
  {
    name: "Quick Sort",
    description: "An efficient, in-place sorting algorithm. Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.",
    timeComplexity: "O(n log n) average, O(n^2) worst case",
    spaceComplexity: "O(log n)",
    pseudocode: "quickSort(arr, low, high):\n    if low < high\n        pi = partition(arr, low, high)\n        quickSort(arr, low, pi - 1)\n        quickSort(arr, pi + 1, high)",
    testCases: "Input: [10, 7, 8, 9, 1, 5]\nOutput: [1, 5, 7, 8, 9, 10]"
  },
  {
    name: "Heap Sort",
    description: "A comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    pseudocode: "heapSort(arr):\n    buildMaxHeap(arr)\n    for i from n to 1\n        swap arr[1] with arr[i]\n        heapify(arr, 1, i-1)",
    testCases: "Input: [12, 11, 13, 5, 6, 7]\nOutput: [5, 6, 7, 11, 12, 13]"
  },
  {
    name: "Counting Sort",
    description: "An integer sorting algorithm that operates by counting the number of objects that possess distinct key values, and applying prefix sum on those counts to determine the positions of each key value in the output sequence.",
    timeComplexity: "O(n + k) where k is the range of the non-negative key values",
    spaceComplexity: "O(n + k)",
    pseudocode: "countingSort(arr, n, k):\n    count = new array of k zeros\n    for i from 0 to n-1\n        count[arr[i]] += 1\n    for i from 1 to k-1\n        count[i] += count[i-1]\n    for i from n-1 down to 0\n        output[count[arr[i]]-1] = arr[i]\n        count[arr[i]] -= 1",
    testCases: "Input: [4, 2, 2, 8, 3, 3, 1]\nOutput: [1, 2, 2, 3, 3, 4, 8]"
  },
  {
    name: "Radix Sort",
    description: "A non-comparative sorting algorithm that sorts data with integer keys by grouping the keys by individual digits that share the same significant position and value.",
    timeComplexity: "O(nk) where k is the number of digits in the largest number",
    spaceComplexity: "O(n + k)",
    pseudocode: "radixSort(arr, n):\n    m = getMax(arr, n)\n    for exp = 1 to m/exp > 0\n        countSort(arr, n, exp)",
    testCases: "Input: [170, 45, 75, 90, 802, 24, 2, 66]\nOutput: [2, 24, 45, 66, 75, 90, 170, 802]"
  }
];

const AlgorithmCard = ({ algorithm }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="h-full"
  >
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">{algorithm.name}</CardTitle>
        <CardDescription>Time: {algorithm.timeComplexity} | Space: {algorithm.spaceComplexity}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{algorithm.description}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/algorithm/${algorithm.name.toLowerCase().replace(/\s+/g, '-')}`} className="w-full">
          <Button variant="outline" className="w-full flex justify-between items-center">
            Learn More <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  </motion.div>
);

const AlgorithmList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Sorting Algorithms
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sortingAlgorithms.map((algorithm, index) => (
          <motion.div
            key={algorithm.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AlgorithmCard algorithm={algorithm} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AlgorithmList;