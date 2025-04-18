import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Permission from './Permission';

const Application = ({ details }) => {
  const data = details.application;
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreClick = (item) => {
    setSelectedApp(item);
    setIsModalOpen(true);
  };

  return (
    <div className='p-8'>
      <Table>
        <TableHeader>
          <TableRow className='text-lg '>
            <TableHead>Sr. No</TableHead>
            <TableHead>App Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.app_name}</TableCell>
              <TableCell>{item.app_version}</TableCell>
              <TableCell>{item.package_name}</TableCell>
              <TableCell>
                <Button
                  variant='default'
                  size='sm'
                  onClick={() => handleMoreClick(item)}
                >
                  More
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Permission
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedApp}
      />
    </div>
  );
};

export default Application;
