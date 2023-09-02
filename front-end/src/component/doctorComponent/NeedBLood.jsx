import React, { useCallback, useEffect, useState } from "react";
import { doctorGetUserForBlood } from "../../api/doctorApi/doctorApi";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import NeedBloodCard from "./Card/NeedBloodCard";
import styled from "styled-components";
const residences = [
  {
    value: "Barishal",
    label: "Barishal",
    children: [
      {
        value: "Barguna",
        label: "Barguna",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Barishal",
        label: "Barishal",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Bhola",
        label: "Bhola",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Jhalokati",
        label: "Jhalokati",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Patuakhali",
        label: "Patuakhali",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Pirojpur",
        label: "Pirojpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
    ],
  },
  {
    value: "Chattogram",
    label: "Chattogram",
    children: [
      {
        value: "Bandarban",
        label: "Bandarban",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Brahmanbaria",
        label: "Brahmanbaria",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Chandpur",
        label: "Chandpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Chattogram",
        label: "Chattogram",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Cumilla",
        label: "Cumilla",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Cox's Bazar",
        label: "Cox's Bazar",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Feni",
        label: "Feni",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Khagrachari",
        label: "Khagrachari",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Lakshmipur",
        label: "Lakshmipur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Noakhali",
        label: "Noakhali",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Rangamati",
        label: "Rangamati",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
    ],
  },
  {
    value: "Dhaka",
    label: "Dhaka",
    children: [
      {
        value: "Dhaka",
        label: "Dhaka",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Faridpur",
        label: "Faridpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Gazipur",
        label: "Gazipur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Gopalganj",
        label: "Gopalganj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Kishoreganj",
        label: "Kishoreganj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Madaripur",
        label: "Madaripur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Manikganj",
        label: "Manikganj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Munshiganj",
        label: "Munshiganj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Narayanganj",
        label: "Narayanganj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Narsingdi",
        label: "Narsingdi",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Rajbari",
        label: "Rajbari",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Shariatpur",
        label: "Shariatpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Tangail",
        label: "Tangail",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
    ],
  },
  {
    value: "Khulna",
    label: "Khulna",
    children: [
      {
        value: "Bagerhat",
        label: "Bagerhat",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Chuadanga",
        label: "Chuadanga",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Jashore",
        label: "Jashore",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Jhenaidah",
        label: "Jhenaidah",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Khulna",
        label: "Khulna",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Kushtia",
        label: "Kushtia",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Magura",
        label: "Magura",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Meherpur",
        label: "Meherpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Narail",
        label: "Narail",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Satkhira",
        label: "Satkhira",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
    ],
  },
  {
    value: "Rajshahi",
    label: "Rajshahi",
    children: [
      {
        value: "Bogura",
        label: "Bogura",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Joypurhat",
        label: "Joypurhat",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Naogaon",
        label: "Naogaon",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Natore",
        label: "Natore",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Nawabganj",
        label: "Nawabganj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Pabna",
        label: "Pabna",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Rajshahi",
        label: "Rajshahi",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Sirajgonj",
        label: "Sirajgonj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
    ],
  },
  {
    value: "Rangpur",
    label: "Rangpur",
    children: [
      {
        value: "Dinajpur",
        label: "Dinajpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Gaibandha",
        label: "Gaibandha",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Kurigram",
        label: "Kurigram",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Lalmonirhat",
        label: "Lalmonirhat",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Nilphamari",
        label: "Nilphamari",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Panchagarh",
        label: "Panchagarh",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Rangpur",
        label: "Rangpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Thakurgaon",
        label: "Thakurgaon",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
    ],
  },
  {
    value: "Sylhet",
    label: "Sylhet",
    children: [
      {
        value: "Habiganj",
        label: "Habiganj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Maulvibazar",
        label: "Maulvibazar",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Sunamganj",
        label: "Sunamganj",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Sylhet",
        label: "Sylhet",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
    ],
  },
  {
    value: "Mymensingh",
    label: "Mymensingh",
    children: [
      {
        value: "Jamalpur",
        label: "Jamalpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Mymensingh",
        label: "Mymensingh",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Netrokona",
        label: "Netrokona",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
      {
        value: "Sherpur",
        label: "Sherpur",
        children: [
          { value: "A+", label: "A+" },
          { value: "A-", label: "A-" },
          { value: "B+", label: "B+" },
          { value: "B-", label: "B-" },
          { value: "O+", label: "O+" },
          { value: "O-", label: "O-" },
          { value: "AB+", label: "AB+" },
          { value: "AB-", label: "AB-" },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const FilterWrapper = styled(Form)`
  display: flex;
  padding-top: 10px;
  margin-left: -80px;
  flex-direction: column;
  width: 400px;
`;
const SearchBarButton = styled(Form.Item)`
  margin-top: -18px;
`;

const NeedBLood = () => {
  const [form] = Form.useForm();
  const [getUserForBlood, setBlood] = useState([]);
  const [query, setQuery] = useState([]);

  const onFinish = async (values) => {
    console.log(form);
    const { data } = await doctorGetUserForBlood();
    const FilterData = data.filter(
      (d) =>
        d.locationDiv === values.address[0] &&
        d.locationDis === values.address[1] &&
        d.bloodGroup === values.address[2]
    );
    setQuery([...values.address]);
    setBlood([...FilterData]);
    // console.log(values.address);
    console.log("Received values of form: ", data);
  };

  const getBlood = useCallback(async () => {
    const { data } = await doctorGetUserForBlood();
    setBlood(data);
    console.log(data);
  }, []);

  useEffect(() => {
    getBlood();
  }, [getBlood]);
  return (
    <div style={{ paddingLeft: 20, height: "100%", overflow: "auto" }}>
      <FilterWrapper
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="address"
          label="Filter"
          rules={[
            {
              type: "array",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>
        <SearchBarButton {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </SearchBarButton>
      </FilterWrapper>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignSelf: "center",
          height: "100%",
          overflow: "auto",
        }}
      >
        {getUserForBlood.length > 0
          ? getUserForBlood.map((data) => {
              if (
                query.length > 0 &&
                query[0] === data.locationDiv &&
                query[1] === data.locationDis &&
                query[2] === data.bloodGroup
              ) {
                return <NeedBloodCard userData={data} />;
              } else {
                return <NeedBloodCard userData={data} />;
              }
            })
          : "No User Available."}
      </div>
    </div>
  );
};

export default NeedBLood;
