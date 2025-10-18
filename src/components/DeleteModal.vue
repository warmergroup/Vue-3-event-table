<script setup lang="ts">
import type { Event } from '../data/EventData';

interface Props {
    isOpen: boolean;
    eventData: Event | null;
}

defineProps<Props>();
const emit = defineEmits<{
    close: [];
    confirm: [];
}>();

const handleConfirm = () => {
    emit('confirm');
    emit('close');
};

const handleClose = () => {
    emit('close');
};
</script>

<template>
    <div v-if="isOpen" class="modal-overlay" @click="handleClose">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h3>Delete Event</h3>
                <button class="close-btn" @click="handleClose">×</button>
            </div>

            <div class="modal-body">
                <p>Are you sure you want to delete this event?</p>
                <div v-if="eventData" class="event-info">
                    <p><strong>ID:</strong> {{ eventData.id }}</p>
                    <p><strong>Event:</strong> {{ eventData.event }}</p>
                    <p><strong>Time:</strong> {{ eventData.time }}</p>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" @click="handleClose">Cancel</button>
                <button class="btn btn-danger" @click="handleConfirm">Delete</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 400px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.close-btn:hover {
    background-color: #f8f9fa;
    color: #495057;
}

.modal-body {
    padding: 20px;
}

.modal-body p {
    margin: 0 0 15px 0;
    color: #495057;
}

.event-info {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
}

.event-info p {
    margin: 5px 0;
    font-size: 14px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px;
    border-top: 1px solid #e9ecef;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-secondary {
    background-color: #f8f9fa;
    color: #6c757d;
}

.btn-secondary:hover {
    background-color: #e9ecef;
    color: #495057;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}
</style>
