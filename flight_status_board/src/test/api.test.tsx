import { expect, test } from 'vitest'
import { getFormatedTime, getFormatedTimeRandom, getStatusColor, nameShortner } from '../utils/formateDate'

test('Get Format Time', () => {
  expect(getFormatedTime("2024-10-24T04:27:13.057Z")).toBe("4:27 AM")
  expect(getFormatedTime("2024-10-24T06:28:19.057Z")).toBe("6:28 AM")
  expect(getFormatedTime("2024-10-24T03:32:09.057Z")).toBe("3:32 AM")
  expect(getFormatedTime("2024-10-24T08:01:05.057Z")).toBe("8:01 AM")
})

test('Get Name Code', () => {
  expect(nameShortner("Origin 1")).toBe("OR1")
  expect(nameShortner("Origin 2")).toBe("OR2")
  expect(nameShortner("Origin 3")).toBe("OR3")
  expect(nameShortner("Origin 4")).toBe("OR4")
  expect(nameShortner("Origin 5")).toBe("OR5")
})

test('Get Color By Status', () => {
  expect(getStatusColor("Boarding")).toBe("bg-green-500 text-white")
  expect(getStatusColor("On Time")).toBe("bg-blue-500 text-white")
  expect(getStatusColor("Delayed")).toBe("bg-red-500 text-white")
  expect(getStatusColor("Departured")).toBe("bg-gray-300")
})

test('Get String Random Time', () => {
  const result = getFormatedTimeRandom("2024-10-24T04:27:13.057Z");
  expect(typeof result).toBe('string');
});