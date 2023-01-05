import express, { Request , Response } from 'express';
// Create an Error interface to add more options 
interface Error{
    name?: string;
    stack?: string;
    message?: string;
    status?: number
};

