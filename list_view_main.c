#include <gtk/gtk.h>

//declare widget
GtkBuilder	*builder;
GtkWidget	*window;
GtkWidget	*button1;
GtkWidget	*label1;

//handle signal
void on_button_add_clicked (GtkButton *b) {
	printf ("hello\n");
	gtk_label_set_text (GTK_LABEL(label1), (const gchar* ) "Hello world");
}

//-----------------main--------------------------
int main(int argc, char *argv[]) {

	//init
  	gtk_init(&argc, &argv);

  	//.glade file
	builder = gtk_builder_new_from_file("../list_view.glade");
	gtk_builder_connect_signals(builder, NULL);		//CONNECT SIGNAL FROM .GLADE FILE

	//window
	window = GTK_WIDGET(gtk_builder_get_object(builder, "window_1"));
	g_signal_connect(window, "destroy", G_CALLBACK(gtk_main_quit), NULL);

	//widget
	button1 = GTK_WIDGET(gtk_builder_get_object(builder, "button_add"));
	label1 = GTK_WIDGET(gtk_builder_get_object(builder, "label_1"));


	//show window
	gtk_widget_show(window);
	gtk_main();

  	return EXIT_SUCCESS;
}