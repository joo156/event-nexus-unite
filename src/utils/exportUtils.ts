
export const exportAttendeeList = async (eventId: number) => {
  const { data: registrations, error } = await supabase
    .from('registrations')
    .select(`
      user_id,
      events (title),
      profiles:user_id (
        name,
        id
      )
    `)
    .eq('event_id', eventId);

  if (error) {
    throw new Error('Failed to fetch attendees');
  }

  // Format data for CSV
  const csvData = registrations.map((reg: any) => ({
    name: reg.profiles?.name || 'Anonymous',
    userId: reg.profiles?.id || 'N/A',
    event: reg.events?.title || 'N/A',
  }));

  // Convert to CSV
  const headers = ['Name', 'User ID', 'Event'];
  const csv = [
    headers.join(','),
    ...csvData.map(row => [row.name, row.userId, row.event].join(','))
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `attendees-event-${eventId}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
