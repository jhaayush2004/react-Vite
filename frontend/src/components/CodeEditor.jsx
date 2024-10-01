import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2 } from "lucide-react";
import axios from 'axios';
import { motion } from 'framer-motion';

const languages = [
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const themes = [
  { value: 'vs-dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
];

function CodeEditor() {
  const [code, setCode] = useState('# Write your code here\n');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setCode(value === 'python' ? '# Write your code here\n' : '// Write your code here\n');
  };

  const handleThemeChange = (value) => {
    setTheme(value);
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    try {
      const uri = `${import.meta.env.VITE_API_URL}/api/code/run`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(uri, { code, language }, config);
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-4">Interactive Code Editor</CardTitle>
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={handleLanguageChange} defaultValue={language}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleThemeChange} defaultValue={theme}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Editor
            height="400px"
            language={language}
            value={code}
            onChange={handleEditorChange}
            theme={theme}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={handleRunCode} disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                'Run Code'
              )}
            </Button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Output:</h3>
            <div className="bg-gray-100 p-4 rounded-md h-[200px] overflow-auto">
              <pre className="whitespace-pre-wrap">{output || 'No output yet. Run your code to see the results.'}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CodeEditor;