import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { sortingAlgorithms } from './AlgorithmList';
import Editor from "@monaco-editor/react";
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion } from 'framer-motion';
import { ChevronLeft, Code, Play } from 'lucide-react';

const AlgorithmEditor = () => {
  const { algoName } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [algorithm, setAlgorithm] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const algo = sortingAlgorithms.find(a => a.name.toLowerCase().replace(/\s+/g, '-') === algoName);
    if (algo) {
      setAlgorithm(algo);
      setCode(getInitialCode(algo.name, language));
    } else {
      navigate('/algorithms');
    }
  }, [algoName, navigate, language]);

  const getInitialCode = (algoName, lang) => {
    const functionName = algoName.replace(/\s+/g, '');
    switch (lang) {
      case 'javascript':
        return `function ${functionName}(arr) {\n  // Implement your ${algoName} algorithm here\n  \n  return arr;\n}`;
      case 'python':
        return `def ${functionName.toLowerCase()}(arr):\n    # Implement your ${algoName} algorithm here\n    \n    return arr`;
      case 'java':
        return `public class ${functionName} {\n    public static int[] sort(int[] arr) {\n        // Implement your ${algoName} algorithm here\n        \n        return arr;\n    }\n}`;
      case 'cpp':
        return `#include <bits/stdc++.h>
using namespace std;

void ${functionName}(vector<int>& arr, int n)
{
    // Implement your ${algoName} algorithm here
}

`;
      default:
        return '';
    }
  };

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setCode(getInitialCode(algorithm.name, value));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setTestResult(null);
    try {
      const response = await axios.post('http://localhost:5000/api/code/test', {
        code,
        language,
        algorithmName: algorithm.name
      });
      setTestResult(response.data);
    } catch (error) {
      setTestResult({ category: 'RED', evaluation: 'Error: ' + (error.response?.data?.error || error.message) });
    } finally {
      setIsLoading(false);
    }
  };

  if (!algorithm) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Link to="/algorithms" className="text-blue-600 hover:underline flex items-center">
              <ChevronLeft className="mr-2" /> Back to Algorithms
            </Link>
            <CardTitle className="text-3xl font-bold">{algorithm.name}</CardTitle>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Pseudocode:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">{algorithm.pseudocode}</pre>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sample Test Case:</h2>
            <p className="bg-gray-100 p-4 rounded-lg">{algorithm.testCases}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={handleLanguageChange} value={language}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-x-4">
              <Link to={`/visualizer/${algoName}`}>
                <Button variant="outline" className="flex items-center">
                  <Code className="mr-2" /> Visualize
                </Button>
              </Link>
             
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Your Code:</h2>
            <Editor
              height="400px"
              language={language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isLoading} className="flex items-center">
              {isLoading ? 'Evaluating...' : (
                <>
                  <Play className="mr-2" /> Run and Evaluate
                </>
              )}
            </Button>
          </div>
          {testResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-6 p-4 rounded-lg ${
                testResult.category === 'GREEN' ? 'bg-green-100' : 
                testResult.category === 'YELLOW' ? 'bg-yellow-100' : 'bg-red-100'
              }`}
            >
              <h3 className="font-bold text-lg mb-2">{testResult.category} Evaluation</h3>
              <p className="mb-2"><span className="font-semibold">Evaluation:</span> {testResult.evaluation}</p>
              <p><span className="font-semibold">Suggestions:</span> {testResult.suggestions}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AlgorithmEditor;