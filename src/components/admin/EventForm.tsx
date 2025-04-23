
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

interface EventFormProps {
  event?: any;
  onSubmit: (eventData: any) => Promise<void>;
  onCancel: () => void;
}

const EventForm = ({ event, onSubmit, onCancel }: EventFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date ? new Date(event.date) : new Date(),
    time: event?.time || '18:00',
    location: event?.location || '',
    image: event?.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: event?.price || '',
    tags: event?.tags || ['Technology'],
    isPaid: event?.isPaid || false,
    availableSpots: event?.availableSpots || '',
    learningPoints: event?.learningPoints || [''],
    featured: event?.featured || false,
    visible: event?.visible !== false // Default to true if undefined
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, date }));
    }
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const removeTag = (index: number) => {
    const newTags = [...formData.tags];
    newTags.splice(index, 1);
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleLearningPointChange = (index: number, value: string) => {
    const newLearningPoints = [...formData.learningPoints];
    newLearningPoints[index] = value;
    setFormData(prev => ({ ...prev, learningPoints: newLearningPoints }));
  };

  const addLearningPoint = () => {
    setFormData(prev => ({ ...prev, learningPoints: [...prev.learningPoints, ''] }));
  };

  const removeLearningPoint = (index: number) => {
    const newLearningPoints = [...formData.learningPoints];
    newLearningPoints.splice(index, 1);
    setFormData(prev => ({ ...prev, learningPoints: newLearningPoints }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Format the date for submission
      const formattedDate = format(formData.date, 'MMMM dd, yyyy');
      const submissionData = {
        ...formData,
        date: formattedDate,
        price: formData.price ? Number(formData.price) : undefined,
        availableSpots: formData.availableSpots ? Number(formData.availableSpots) : undefined,
        isPaid: Boolean(formData.price && Number(formData.price) > 0),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        learningPoints: formData.learningPoints.filter(point => point.trim() !== '')
      };
      
      await onSubmit(submissionData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="dark-input mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={5}
              className="dark-input mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-full dark-input mt-1 flex justify-start"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.date, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card border-white/10 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateChange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="dark-input mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="dark-input mt-1"
              placeholder="In-Person or Virtual"
            />
          </div>
          
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              className="dark-input mt-1"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                className="dark-input mt-1"
                placeholder="0 for free event"
              />
            </div>
            
            <div>
              <Label htmlFor="availableSpots">Available Spots</Label>
              <Input
                id="availableSpots"
                name="availableSpots"
                type="number"
                value={formData.availableSpots}
                onChange={handleInputChange}
                className="dark-input mt-1"
                placeholder="Leave blank for unlimited"
              />
            </div>
          </div>
          
          <div>
            <Label>Tags</Label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center mt-2">
                <Input
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="dark-input"
                  placeholder="Tag name"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-gray-400 hover:text-white"
                  onClick={() => removeTag(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 text-gray-300 border-white/10 hover:bg-secondary"
              onClick={addTag}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Tag
            </Button>
          </div>
          
          <div>
            <Label>Learning Points</Label>
            {formData.learningPoints.map((point, index) => (
              <div key={index} className="flex items-center mt-2">
                <Input
                  value={point}
                  onChange={(e) => handleLearningPointChange(index, e.target.value)}
                  className="dark-input"
                  placeholder="What attendees will learn"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-gray-400 hover:text-white"
                  onClick={() => removeLearningPoint(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 text-gray-300 border-white/10 hover:bg-secondary"
              onClick={addLearningPoint}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Learning Point
            </Button>
          </div>
          
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured Event</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="visible"
                checked={formData.visible}
                onCheckedChange={(checked) => handleSwitchChange('visible', checked)}
              />
              <Label htmlFor="visible">Visible to Users</Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="border-white/10 text-white"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
