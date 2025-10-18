<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Event } from '../data/EventData';

interface Props {
    isOpen: boolean;
    eventData: Event | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    close: [];
    save: [data: Partial<Event>];
}>();

const time = ref('');
const system = ref('');
const notes = ref('');

const systemOptions = ['Driver', 'ELD'];

watch(() => props.eventData, (newData) => {
    if (newData) {
        time.value = newData.time;
        system.value = newData.system;
        notes.value = newData.notes;
    }
});

const handleSave = () => {
    if (!props.eventData) return;

    emit('save', {
        time: time.value,
        system: system.value,
        notes: notes.value
    });
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
                <h3>Edit Event</h3>
                <button class="close-btn" @click="handleClose">×</button>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label for="time">Time:</label>
                    <input type="datetime-local" id="time" v-model="time" class="form-input" min="1900-01-01T00:00"
                        max="2100-12-31T23:59" />
                </div>

                <div class="form-group">
                    <label for="system">System:</label>
                    <select id="system" v-model="system" class="form-select">
                        <option v-for="option in systemOptions" :key="option" :value="option">
                            {{ option }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="notes">Notes:</label>
                    <textarea id="notes" v-model="notes" class="form-textarea" rows="2"></textarea>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" @click="handleClose">Cancel</button>
                <button class="btn btn-primary" @click="handleSave">Save</button>
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
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
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

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #495057;
    font-size: 14px;
}

.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
    color: #495057;
    background-color: #ffffff;
    transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
    resize: vertical;
    min-height: 80px;
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

.btn-primary {
    background-color: #3b82f6;
    color: white;
}

.btn-primary:hover {
    background-color: #2563eb;
}
</style>
