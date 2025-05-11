import { IconButton, MenuItem, Select, TableCell, TableRow, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Transaction } from '../../../types/Transaction';
import dayjs from 'dayjs';
import { deleteData, updateData } from '../../../services/api';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

export function TransactionTableRow(props: { transaction: Transaction, fetchTransactionData: any }) {
    const [isEditable, setIsEditable] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Transaction>()

    const handleClose = () => {
        setIsEditable(!isEditable)
    }

    const handleDelete = (transactionId: number) => {
        console.log('delete', transactionId)
        deleteData(transactionId)
        props.fetchTransactionData()
    }

    const handleEdit = () => {
        setIsEditable(!isEditable)
    }

    const handleSave: SubmitHandler<Transaction> = async (data) => {
        console.log('save', { ...data, id: props.transaction.id })
        setIsEditable(!isEditable)
        await updateData({ ...data, id: props.transaction.id })
        props.fetchTransactionData()
    }

    return (
        <>
            {isEditable
                ? <TableRow key={props.transaction.id}>
                    <TableCell>{props.transaction.id}</TableCell>
                    <TableCell>
                        <Controller
                            control={control}
                            name='date'
                            render={({ field }) => {
                                return (<DatePicker
                                    label="Date"
                                    defaultValue={field.value}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        field.onChange(date?.format('MM/DD/YYYY'));
                                    }}
                                />)
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <TextField label='Description' {...register('description')} />
                        </form>
                    </TableCell>
                    <TableCell>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <TextField label='Amount' type='number'  {...register('amount', { valueAsNumber: true })} />
                        </form>
                    </TableCell>
                    <TableCell>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <Select defaultValue='' {...register('category')}>
                                <MenuItem value='Deposits'>Deposits</MenuItem>
                                <MenuItem value='Recurring'>Recurring</MenuItem>
                                <MenuItem value='Utilities'>Utilities</MenuItem>
                            </Select>
                        </form>
                    </TableCell>
                    <TableCell>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <IconButton type='submit'><SaveIcon /></IconButton>
                        </form>
                        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                    </TableCell>
                </TableRow>
                : <TableRow key={props.transaction.id}>
                    <TableCell>{props.transaction.id}</TableCell>
                    <TableCell>{dayjs(props.transaction.date).format('MM/DD/YYYY')}</TableCell>
                    <TableCell>{props.transaction.description}</TableCell>
                    <TableCell>{props.transaction.amount}</TableCell>
                    <TableCell>{props.transaction.category}</TableCell>
                    <TableCell>
                        <IconButton onClick={handleEdit}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(props.transaction.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                </TableRow>
            }
        </>
    )
}